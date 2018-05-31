require "../lib/json_encoder"

struct SignalSocket < Maze::WebSockets::ClientSocket
  channel "signal", SignalChannel

  def on_connect
    # do some authentication here
    # return true or false, if false the socket will be closed
    true
  end

  def self.send_signal(topic : String, action : String, json_signal : String)
    self.broadcast("message", topic, action, {"data" => json_signal} )
  rescue ex
    puts "Error broadcasting signal #{ex.message}"
  end

end

module Sockets::Signal
  def self.send_signal(name : String, action : String, json_signal : String)
    SignalSocket.send_signal(name, action, json_signal)
  end

  def self.send_signal(name : String, action : String, hash_signal : Hash(String,String))
    io = IO::Memory.new(4096_i64)

    JSON.build(io) do |json|
      json.object do
        hash_model.each do |k, v|
          Maze.json_encode_field json, k, v
        end
      end
    end

    SignalSocket.send_signal(name, action, io.to_s)
  end
end
