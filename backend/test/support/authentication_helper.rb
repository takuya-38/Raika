module AuthenticationHelper
  def setup
    super
    ApplicationController.allow_any_instance_of(ApplicationController).to receive(:authenticate)
  end
end
