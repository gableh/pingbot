
module.exports = function(robot) {

  robot.respond(/ping( )?(.*)?/i, function(msg, done) {
    website = msg.match[2];
    if(website === undefined){
      msg.reply("Please type in a website, e.g ping www.asknestor.me", done);
    } else {
      if(website.search(/http.*/) == -1){
        formattedWebsite = "https://" + website;
      }
      robot.http(formattedWebsite).head()(function(err, res) {
        if(res === null || res.statusCode != "200"){
          msg.reply(website + " is down! :slightly_frowning_face:",done);
        } else {
          msg.reply(website + " is up! :simple_smile:",done);
        }
      });
    }
  });
};
