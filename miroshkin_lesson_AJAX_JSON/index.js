function makeGETRequest(url, callback) {
    var xhr;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback(xhr.responseText);
        }
    }

    xhr.open('GET', url, true);

    xhr.send();
}

function makePOSTRequest(url, data, callback) {
    var xhr;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if(window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }

    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    xhr.send(data);
}

function Blog() {
    this.users = [];
}

Blog.API_URL = 'https://jsonplaceholder.typicode.com';

Blog.prototype.fetchUsers = function (callback) {
  var self = this;
  makeGETRequest(Blog.API_URL + '/users?username=Samantha', function (response) {
    self.users = JSON.parse(response);
    callback();
  }); 
}


Blog.prototype.addPost = function(data, callback) {
    makePOSTRequest(Blog.API_URL + '/posts', JSON.stringify(data), function (response) {
        var res = JSON.parse(response);
        callback(res.id);
    });
}

//Method fetchPosts
Blog.prototype.fetchPosts = function(data, callback) {
    makePOSTRequest(Blog.API_URL + '/posts', JSON.stringify(data), function (response) {
        var response = JSON.parse(response);
        callback(response);
    });
}

var blog = new Blog();

var data = {
    title: 'foo',
    body: 'bar',
    userId: 1
};


//GET REQUEST
/*blog.fetchUsers(function () {
    document.write('<pre>' + JSON.stringify(blog.users) + '</pre>');
});*/

//POST REQUEST
/*blog.addPost(data, function(id) {
    console.log(id);
});*/

blog.fetchPosts(function(response) {
    document.write('<pre>' + JSON.parse(response) + '</pre>');
})

