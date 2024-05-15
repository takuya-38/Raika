# 一次保存
# class SessionController < ApplicationController
#   def create
#     begin
#       session_cookie = create_session_cookie(@id_token)
#       cookies[:session] = {
#         value: session_cookie,
#         expires: 5.days.from_now,
#         httponly: true,
#         secure: Rails.env.production?
#       }
#       render json: { status: "success" }, status: :ok
#     rescue FirebaseIdToken::SignatureError => e
#       render json: { error: "Invalid ID token" }, status: :unauthorized
#     end
#   end

#   private
#     def create_session_cookie(id_token)
#       exp_time = 5.days.from_now.to_i
#       payload = {
#         "id_token" => id_token,
#         "exp" => exp_time
#       }
#       JWT.encode(payload, Rails.application.secrets.secret_key_base)
#     end
# end
