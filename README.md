# Vibecoders

An all-in-one mobile app that empowers anyone to respond to emergencies through AI-guided first aid, interactive crisis training, and real-time navigation - turning everyday smartphones into life-saving tools.

## To Connect to GitHub
1. Open VSCode and clone the repo
2. Click "Code" button and copy the URL generated

```
git remote -v
git remote add origin https://github.com/your-username/your-repo.git
cd application-reqwise
npm add expo
npx expo start
```

## Expo

First, run the development server:

```
npx expo start
```

# Git Guidelines
Steps for collaborating developers only. Before starting on the project, please read through this portion.

1. **Start by Git cloning repository**  
```
git clone <URL>
``` 
This creates a folder sig-hub in the directory you run this command in.

2. **Switch between branches**  
```
git switch branch-name
```  
This switches the current working branch to branch-name. Change branch name to your personal working branch to avoid merge conflicts.
```
git switch -c branch-name
```
This creates a new branch branch-name. Change branch name to how 

3. **Pulling Changes**  
If there are any updates from the upper branches (i.e. main, test), you need to pull the changes using the command:  
```
git pull origin master
```  
However, this is unlikely as the development branches would be ahead in some commits compared to the upper branches, and is only done when other working branch changes are successfully reviewed and passed into testing.

4. **Staging Changes**  
```
git add .
```  
This adds all modified files to be staged for the next commit.  
```
git add example.md
```  
This example only adds the specified file (example.md) to be staged for the next commit.

5. **Committing Changes**  
```
git commit -m "feat(eg): add example"
```  
This commits all staged changes while writing a short message.  
```
git commit
```  
This commits all staged changes while opening up a text editor to write commit message.  

**Note**  
When committing any chnages, please follow the documentation for commit messages below:  
```
| type(optional-scope): short summary |  
| optinal description (1 or 2 lines) |  
```
- Clear and concise
- Keep it short
- Capitalise only the first word
- No period at the end
- Avoid fixing multiple issues in one commit
    - Do it one at a time

| Prefix Type | Description                                          |
|----------|-----------------------------------------------------------|
| `feat`   | new feature                                               |
| `fix`    | bug fix                                                   |
| `docs`   | documentation changes only                                |
| `style`  | changes that don't affect logic (e.g. spaces, formatting) |
| `refactor`| code change that isn’t a fix or feature                  |
| `perf`   | performance improvements                                  |
| `test`   | adding or updating tests                                  |
| `chore`  | other changes (e.g. build tasks, configs)                 |


6. **Pushing Changes**  
```
git push
```  
Since the branches are setup properly, simply running git push would upload your changes to Github.  
```
git push -u origin branch-name
```  
If there is a problem of not being able to find your remote branch, run the above command. Replace the branch name to the dev branch you are working on.

7. **Branch Rebasing**
If your branch fall behind the main branch, you need to rebase the outdated branch onto the updated main branch.
```
git fetch origin
```
This fetches the latest changes.
```
git rebase origin/master
```
This rebases the branch to a more up-to-date one.

**Note**  
Push requests would be reviewed before being merged into the test branch for further testing with other fixes and new features.  
Merging of features from test branch to main branch would be done at certain project intervals or when certain major features of the project are completed and would require little changes.
