# simple_twitter_timeline
Script that will pull the 20 latest tweets using only a widget ID.

This script uses a script tag proxy to get the 20 latest tweets from twitter using the widget ID that you create 
within your Twitter account. 

Add the script to your page and call this function:

twtrUtil.getTimeline(CALLBACK_HERE,ID_HERE)

Your callback is sent an array of "tweet" objects.
