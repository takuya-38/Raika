require "jwt"
require "net/http"
require "openssl"

module FirebaseAuthenticator
  extend ActiveSupport::Concern

  class InvalidTokenError < StandardError; end

  ALG = "RS256"
  CERTS_URI = "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com"
  CERTS_CACHE_KEY = "firebase_auth_certificates"
  ISSUER_URI_BASE = "https://securetoken.google.com/"

  def decode(token)
    options = {
      algorithm: ALG,
      iss: ISSUER_URI_BASE + ENV["PROJECT_ID"],
      verify_iss: true,
      aud: ENV["PROJECT_ID"],
      verify_aud: true,
      verify_iat: true,
    }

    # JWT検証
    payload, _ = JWT.decode(token, nil, true, options) do |header|
      cert = fetch_certificates[header["kid"]]
      if cert.present?
        OpenSSL::X509::Certificate.new(cert).public_key
      else
        nil
      end
    end

    # JWT.decode でチェックされない項目のチェック
    raise InvalidTokenError.new("Invalid auth_time") unless Time.zone.at(payload["auth_time"]).past?
    raise InvalidTokenError.new("Invalid sub") if payload["sub"].empty?

    payload
  rescue JWT::DecodeError => e
    Rails.logger.error e.message
    Rails.logger.error e.backtrace.join("\n")

    raise InvalidTokenError.new(e.message)
  end

  private
    # 公開鍵を取得するメソッド
    def fetch_certificates
      # キャッシュから公開鍵取得
      cached = Rails.cache.read(CERTS_CACHE_KEY)
      return cached if cached.present?

      # キャッシュに公開鍵がない場合は、Google の URL から取得
      res = Net::HTTP.get_response(URI(CERTS_URI))
      raise "Fetch certificates error" unless res.is_a?(Net::HTTPSuccess)
      body = JSON.parse(res.body)

      # 公開鍵をキャッシュに保存
      expires_at = Time.zone.parse(res.header["expires"])
      Rails.cache.write(CERTS_CACHE_KEY, body, expires_in: expires_at - Time.current)

      body
    end
end
