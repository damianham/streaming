Maze::Server.configure do |app|
  pipeline :web do
    # Plug is the method to use connect a pipe (middleware)
    # A plug accepts an instance of HTTP::Handler
    plug Maze::Pipe::PoweredByMaze.new
    # plug Maze::Pipe::ClientIp.new(["X-Forwarded-For"])
    plug Citrine::I18n::Handler.new
    plug Maze::Pipe::Error.new
    plug Maze::Pipe::Logger.new
    plug Maze::Pipe::Session.new
    plug Maze::Pipe::Flash.new
    plug Maze::Pipe::CSRF.new
    # Reload clients browsers (development only)
    plug Maze::Pipe::Reload.new if Maze.env.development?

    # enable this pipe for JWT support however you need a User model
    # 'maze g auth' will create a User model and signin/signup routes
    # it will also add 'plug Authenticate.new' which you should disable
    #plug AuthenticateJWT.new
  end

  # All static content will run these transformations
  pipeline :static do
    plug Maze::Pipe::PoweredByMaze.new
    # plug Maze::Pipe::ClientIp.new(["X-Forwarded-For"])
    plug Maze::Pipe::Error.new
    plug Maze::Pipe::Static.new("./public")
  end

  routes :web do
    get "/authenticateWithToken", HomeController, :authenticate_jwt
    get "/me", HomeController, :me
    websocket "/model", ModelSocket
    websocket "/signal", SignalSocket
    get "/", HomeController, :index
  end

  routes :static do
    # Each route is defined as follow
    # verb resource : String, controller : Symbol, action : Symbol
    get "/*", Maze::Controller::Static, :index
  end
end
