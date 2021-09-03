var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/JondaGit/nuds', // Update to point to your repository  
        user: {
            name: 'JondaGit', // update to use your name
            email: 'jon.tich@volny.cz' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)