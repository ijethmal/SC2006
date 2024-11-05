# 2006-REP-36


# Branches:
1. **TRY TO BRANCH EVERYTIME YOU WORK ON A NEW FEATURE**
2. **DO NOT PUSH TO MASTER**
3. To start, make sure you pull the latest changes from `main` branch
```
cd SC2006
git checkout main
git status  -> check you are at main branch
git pull origin main
```

4. Then create a new branch with this format `<which_code-feature-name>`, for i.e: 
```
git checkout -b frontend-login 
>>> this should work on newlogin feature in the frontend.
```

5. After you are done with your feature, push to the branch you created.

To see what you have done, you can use `git status` to see what files you have changed.
-  Red files are files that have been modified but not staged.
- Green files are files that have been staged but not committed.

To stage files for preapre to commit, use: 
- If you want to stage all files, use `git add .`
- If you want to remove a file from staging (not commiting it), use `git restore --unstage <filename>`
- If you want to add specific files, use `git add <filename>`

Check the status again to see if the files are staged. If they are, you can commit them using 

```
git status
git commit -m "Your message here"
git push origin <which_code-feature-name>
```

6. Open our repo, then create a pull request from the branch you created to the main branch to see the changes you have made. **Ask everyone to review code** before merging.




--------------------------------------------------------
Our application, called GatherHub, aims to bring community residents together by facilitating the formation of community groups for them to partake in shared interests together. 

It also serves as a comprehensive, growing list of sports facilities in Singapore categorized by type and residential area, sorted such that users can search through them to find one that suits their needs at the moment.

Datasets are retrieved from data.gov: https://beta.data.gov.sg/datasets?agencies=Sport+Singapore+%28SPORT%29&resultId=d_9b87bab59d036a60fad2a91530e10773
https://beta.data.gov.sg/datasets?agencies=Sport+Singapore+%28SPORT%29&query=sport&resultId=d_828e36827f339f36811377857bc99f48

API calls:
- Weather SG (Live): https://data.gov.sg/datasets?query=weather&page=1&resultId=d_ce2eb1e307bda31993c533285834ef2b
- Mapbox: https://docs.mapbox.com/api/overview/
- Tourism Info Hub (Live): https://tih-dev.stb.gov.sg/content-api/apis/get/events/v2/search
