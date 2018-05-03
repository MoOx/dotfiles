#!/usr/bin/env zsh

# ~/Sync/ folder + icon
if ! ls $DIR_SYNC &> /dev/null
then
  mkdir $DIR_SYNC

  echo "Please configure your Sync system, then type Enter to continue"
  read -k
fi

# some unversionned stuff
dotfiles $DIR_SYNC/.home

# Sync/Library/*
# (eg: Fonts, iTunes)
lnfs-subfolders $DIR_SYNC/Library $HOME/Library

# Sync/Library/Application Support/*
lnfs-subfolders "$DIR_SYNC/Library_Application Support" "$HOME/Library/Application Support"

# Sync/Library/Containers/*
# (eg: iBooks)
lnfs-subfolders "$DIR_SYNC/Library_Containers" "$HOME/Library/Containers"

# Sync/iTunes
if ls $DIR_SYNC/iTunes &> /dev/null
then
  rm -rf $HOME/Music/iTunes &> /dev/null
  ln -s $DIR_SYNC/iTunes $HOME/Music/iTunes
fi

# Sync/Pictures
if ls $DIR_SYNC/Pictures &> /dev/null
then
  sudo rm -rf $HOME/Pictures
  ln -s $DIR_SYNC/Pictures $HOME/Pictures
fi

# Shared Photos
SHARED_PHOTOS="/Users/Shared/Photos"
if ! ls $SHARED_PHOTOS &> /dev/null
then
  if ls $DIR_SYNC/Photos &> /dev/null
  then
    ln -s $DIR_SYNC/Photos $SHARED_PHOTOS
  elif ls "/Volumes/Shared HD/Photos" &> /dev/null
  then
    ln -s "/Volumes/Shared HD/Photos" $SHARED_PHOTOS
  fi
fi

# hide macOS unused folders
chflags -h hidden $HOME/Documents
chflags -h hidden $HOME/Movies
chflags -h hidden $HOME/Music
chflags -h hidden $HOME/Pictures
