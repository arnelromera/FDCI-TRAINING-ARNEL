$(document).ready(function(){
    const API_TOKEN = define.access_token;
    var baseUrl ='https://api.github.com/';
    var username = 'arnelromera';
    $('#popularRepos').hide();

    $.ajax({
        'url': `${baseUrl}users/${username}`,
        'method':'GET',
        'headers': {'Authorization': 'token ' + API_TOKEN},
        'dataType': 'json',
        'success': function(results){
            console.log(results);
            displayUser(results);
        },
        'error': function(error){
            console.log(error);
        }
    });
    function displayUser(user){
        var userContainer = $('#userContainer');
        userContainer.empty();
        var userHTML = '';
    
        if (Array.isArray(user)) {
            user.forEach(function(userData){
                userHTML += '<div class="userWapper">';
                userHTML += '<img src="'+ userData.avatar_url + '"></img>';
                userHTML += '<div class="userInfo">';
                userHTML += '<p>' + userData.name + '</p>';
                userHTML += '<p>' + userData.company + '</p>';
                userHTML += '</div>';
                userHTML += '</div>';
            });
        } else {
            userHTML += '<div class="userWapper">';
            userHTML += '<img src="'+ user.avatar_url + '"></img>';
            userHTML += '<div class="userInfo">';
                userHTML += '<p><strong>' + user.name + '</strong></p>';
                userHTML += '<p>' + user.company + '</p>';
            userHTML += '</div>';
            userHTML += '</div>';
        }
        
        userContainer.append(userHTML);
    }
    $.ajax({
        'url': `${baseUrl}users/${username}/repos`,
        'method': 'GET',
        'headers': {'Authorization': 'token ' + API_TOKEN},
        'dataType': 'json',
        'success': function(results){
            console.log(results);
            displayRepos(results);
        },
        'error': function(error){
            console.log(error);
        }
    });
    function displayRepos(repos) {
        var repoListContainer = $('#repoList');
        
        repoListContainer.empty();

        if (repos.length > 0) {
            $('#popularRepos').show();
        } else {
            $('#popularRepos').hide();
        }

        repos.forEach(function(repo) { 
            var repoHTML = '<li class="repo">';
            repoHTML += '<a href="#" data-repo="' + repo.name + '">' + repo.name + '</a>';
            repoHTML += '</li>';

            repoListContainer.append(repoHTML);
        });
        repoListContainer.on('click', 'a', function(e) {
            e.preventDefault();
            var repoName = $(this).data('repo');
            if (repoName) {
                fetchCommits(repoName);
            } else {
                console.log('repoName is undefined');
            }
        });
    }
    function fetchCommits(repoName) {
        var commitsUrl = `${baseUrl}repos/${username}/${repoName}/commits`;
        $.ajax({
            url: commitsUrl,
            method: 'GET',
            headers: {'Authorization': 'token ' + API_TOKEN},
            dataType: 'json',
            success: function(commits) {
                console.log(commits);
                    if (commits.length > 0) {
                        $('#wrapper').show(); // Show the commit section if commits are found
                        displayCommits(commits);
                    } else {
                        $('#wrapper').hide(); // Hide the commit section if no commits are found
                    }
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    function displayCommits(commits) {
        var commitsListContainer = $('#commitsList');

        // commitsListContainer.find('tr.commit').remove();

        commits.forEach(function(commit) { 
            var commitHTML = '<tr class="commit">';
            commitHTML += '<td>' + commit.commit.author.name + '</td>';
            commitHTML += '<td>' + commit.commit.author.date + '</td>';
            commitHTML += '<td>' + commit.commit.message + '</td>';
            // commitHTML += '<td>' + commit.commit.hmtl_url + '</td>';
            commitHTML += '</tr>';

            commitsListContainer.append(commitHTML);
        });
    }
});
