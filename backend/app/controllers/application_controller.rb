class ApplicationController < ActionController::API
  include FirebaseAuthenticator
  before_action :authenticate, unless: -> { Rails.env.test? }
  class AuthenticationError < StandardError; end
  rescue_from AuthenticationError, with: :not_authenticated

  def authenticate
    Rails.logger.info(request.headers["Authorization"]&.split&.last)
    payload = decode(request.headers["Authorization"]&.split&.last)
    raise AuthenticationError unless payload["user_id"]
  end

  # 今後のため
  # def current_user(user_id = nil)
  #   @current_user ||= User.find_by(uid: user_id)
  # end

  private
    def not_authenticated
      render json: { error: { messages: ["ログインしてください"] } }, status: :unauthorized
    end
end
