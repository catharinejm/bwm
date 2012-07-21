require 'bundler'
Bundler.require(:default)

require 'pathname'

desc "Compile assets"
task :compile do
  Dir["scss/**/*.scss"].each do |scss_file|
    template = File.read scss_file
    css = Sass::Engine.new(template, :syntax => :scss).render
    File.open("compiled/css/#{File.basename(scss_file, ".scss")}.css", 'w') { |f| f.write css }
  end

  Dir["coffee/**/*.coffee"].each do |coffee_file|
    coffee_src = File.read(coffee_file)
    js = CoffeeScript.compile coffee_src
    File.open("compiled/js/#{File.basename(coffee_file, ".coffee")}.js", 'w') { |f| f.write js }
  end
end
