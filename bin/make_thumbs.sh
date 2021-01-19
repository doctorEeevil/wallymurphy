#!/bin/sh

# Purpose:
#   Make .gif thumbnails for all the jpg files.
# References
#   From "Application Notes" at
#     https://www.commandlinux.com/man-page/man1/netpbm.1.html

for srcFile in public/images/sketches/jpg/*.jpg ; do
	 targetFile=public/images/sketches/thumbnails/`basename $srcFile .jpg`-sml.png
	 echo "converting $srcFile to $targetFile"
	  jpegtopnm < $srcFile | pnmscale -reduce 3 | pnmtopng > $targetFile
	 # CMD="jpegtopnm < $srcFile | pnmscale -reduce 3 | pnmtopng > $targetFile"
	 # echo "$CMD"
	 # $CMD
done
