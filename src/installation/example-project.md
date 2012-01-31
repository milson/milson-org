---
  title: Example Project
  id: example-project
---

This site itself is an example project.


Before you go getting fancy, you should make sure that everything is installed properly and working as expected.

### Download this project (includes example site)


You can download this project in either `git` (preferred), `tgz`, or `zip` format.

#### git

    git clone git://github.com/milson/mildoc.git

#### tgz

    wget https://github.com/milson/mildoc/tarball/master -O mildoc.tgz
    mkdir mildoc
    mv milson-mildoc-* mildoc
        
#### zip

    wget https://github.com/milson/mildoc/zipball/master -O mildoc.zip
    unzip mildoc.zip
    mv milson-mildoc-* mildoc
    
### Build

    cd mildoc
    ./build.sh
    cd public
    served 7755 &

### View

You should now be able to open your web browser to <http://localhost:7755> and see
the site almost exactly as it appears on <http://milson.github.com/mildoc>.

If you've gotten this far, then everything is working correctly. Congratulations!
