# MHS-Web #

The deployment version of this site on the internet is viewable at: [https://lab.dsg.northeastern.edu]([url](https://lab.dsg.northeastern.edu))
The development version of this site on the internet is viewable at: [bit.ly/dsg-mhs](bit.ly/dsg-mhs)

This repo is a static site generator built website that holds visulalizations for data held in the documents of the [Mass. Histroical Society's Primary Source Co-operative.](https://www.primarysourcecoop.org)
The ideaology of this site is that it serves to provide a more digestible entry into the information that the PSC holds in their documents, by creating and hosting interesting visualzations, while also allowing users to easily tie back the visualation to the actual document(s) they relate to within 2 clicks. 

To see more on the graphing methodologied and, detailed explanations and motivations for code you can view this [Google Doc.](https://docs.google.com/document/d/1sOZVYDyaVp5KDOTZavHxpIHgjUf5E6oClXFEq7fsblc/edit?usp=sharingp) 

## Running the Site ##
To install dependancies you should first run
```npm install```

As you'll see, there are not any html files in this repo, to have the static site generator (11ty) build them,  run
```npm run build```

You can also use ```npm run serve```  to build the site, host a local server and automtically continually update it as you make changes. 

## Adding a Person or Tool ##
All instructions for building the cards, the menu, the pages, etc. is pulled from the data in the ```data.js``` file. Adding a complete entry to either tools or projects there will add that respective addition to every where on the site, you however will need to add the data folders and relavent files in the sturcture of collectionInitials/toolShortName (both the names that appear in the URL pages for them). If you are using ```npm run serve``` and do not notice a change in the file taking affect, try closing the server and then serving again. 

## Notes ##
This site was originally built with pure HTML, and was later converted. To see the full edit history (chronologically), you can view these repos. 

1. **Fork of Bill Quinn's Lab Space.** Which can be accessed [here](https://github.com/ankudovychm/dsg-mhs).

2. **MHS-web-outdated**. This holds a view of the site before being converted to a Static Site Generator, and can be accessed [here](https://github.com/NEU-DSG/mhs-web-outdated). 

3. **This Repo.**

As mentioned above, this uses [11ty](https://www.11ty.dev/), docs for which can be found [here](https://www.11ty.dev/docs/). 

Additionally, this repo uses a custom forked NPM package for the timeline chart, which can be found [here](https://github.com/ankudovychm/dsg-gtimeline). 

### If Running On Node 23 and Receiving a Pagination Error ###

There was briefly a bug in 11ty that caused an error in how module exports were handled. However, it should be fixed, If you are stillr eceiving this error, you should be able to solve it by adding the logic presented in this [pull request](https://github.com/11ty/eleventy/pull/3519/files).

### Github Actions ### 
1. There are two Github actions in this file, which are used to deploy the site to the dev and deployment servers.
2. There is another github action from another DSG-MHS repo, which adds in data to this site from being processed elsewhere.
