require 'bundler'
Bundler.require(:default)

require 'pathname'

desc "Compile assets"
task :compile do
  puts "Compiling SCSS..."
  Dir["scss/**/*.scss"].each do |scss_file|
    template = File.read scss_file
    css = Sass::Engine.new(template, :syntax => :scss).render
    output_file = "compiled/css/#{File.basename(scss_file, ".scss")}.css"
    puts "\t#{scss_file} => #{output_file}"
    File.open(output_file, 'w') { |f| f.write css }
  end
  puts "\tDone!"
  puts

  puts "Compiling CoffeeScript..."
  Dir["coffee/**/*.coffee"].each do |coffee_file|
    coffee_src = File.read(coffee_file)
    js = CoffeeScript.compile coffee_src
    output_file = "compiled/js/#{File.basename(coffee_file, ".coffee")}.js"
    puts "\t#{coffee_file} => #{output_file}"
    File.open(output_file, 'w') { |f| f.write js }
  end
  puts "\tDone!"
end

task :default => :compile
