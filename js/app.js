var Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs')),
    path = require('path'),
    jade = require('jade');

var template,
    dir = '/';

var getTemplate = function () {
  fs.readFileAsync('./templates/finder.jade', 'utf8')
    .then(function(tmpl) {
      template = jade.compile(tmpl);
      showFolder(dir);
    });
};

var prepare = function (pth, files) {
  var checks = [],
      render = { files: [] };

  render.parent = (pth.match(/^\/$/)) ? pth : path.dirname(pth);
  render.folder = pth;

  files.forEach(function (file) {
    var obj = { name: file };

    checks.push(fs.statAsync(path.join(pth, file))
      .then(function (stats) {
        obj.folder = stats.isDirectory();
      })
      .catch(function (err) {
        console.log(err);
      }));

    render.files.push(obj);

  });

  return Promise.all(checks)
    .then(function () {
      return render;
    });
};

var showFolder = function (pth) {
  fs.readdirAsync(pth)
    .then(function (files) {
      prepare(pth, files)
        .then(function (render) {
          $('#finder').html(template(render));
        });
    });
};

$(function () {
  getTemplate();
  $('#finder').on('click', 'ul a', function (event) {
    event.preventDefault();
    dir = path.join(dir, $(this).attr('href'));
    showFolder(dir);
  });

  $('#finder').on('click', 'a.parent', function (event) {
    event.preventDefault();
    dir = path.dirname(dir);
    showFolder(dir);
  });

});
