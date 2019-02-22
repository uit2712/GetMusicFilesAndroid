# GetMusicFilesAndroid
Get music files on Android in React Native

Youtube video: https://www.youtube.com/watch?v=aXmUE7UwRGU

<b>1) STEP 1:</b> Install necessary modules 'react-native-get-music-files'<br>
a) Install 'react-native-get-music-files': npm install --save react-native-get-music-files<br>
b) Link: react-native link react-native-get-music-files<br>
<b>2) STEP 2:</b> Edit file 'android/settings.gradle'<br>
Replace '..\node_modules\react-native-get-music-files\android' to '../node_modules/react-native-get-music-files/android'<br>
<b>3) STEP 3:</b> Require to 'read, write storage permissions' using 'react-native-permissions'<br>
(link: https://github.com/yonahforst/react-native-permissions):<br>
a) Install 'react-native-permissions':<br>
	npm i --save react-native-permissions<br>
	react-native link react-native-permissions<br>
b) Grant permissions: storage<br>
<b>4) STEP 4:</b> Add model TrackInfo with these attributes:<br>
id<br>
artist<br>
duration<br>
genre<br>
title<br>
minimumSongDuration<br>
path<br>
<b>5) STEP 5:</b> Render all tracks on phone
