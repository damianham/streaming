module Maze

  def self.json_encode_field(json, col, value)
    case value
    when Bytes
      # custom json encoding. Avoid extra allocations.
      json.field col do
        json.array do
          value.each do |e|
            json.scalar e
          end
        end
      end
    else
      # encode the value as their built in json format.
      json.field col do
        value.to_json(json)
      end
    end
  end
  
end
