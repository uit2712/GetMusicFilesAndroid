export default class TrackInfo {
    id: number;
    artist: string;
    duration: number;
    genre: string;
    title: string;
    fileName: string;
    path: string;
    track: any;

    constructor(trackInfo: any) {
        if (trackInfo) {
            if (trackInfo['id'])
                this.id = Number(trackInfo['id']);
            if (trackInfo['artist'])
                this.artist = trackInfo['artist'];
            if (trackInfo['duration'])
                this.duration = Number(trackInfo['duration']);
            if (trackInfo['genre'])
                this.genre = trackInfo['genre'];
            if (trackInfo['title'])
                this.title = trackInfo['title'];
            if (trackInfo['fileName'])
                this.fileName = trackInfo['fileName'];
            if (trackInfo['path'])
                this.path = trackInfo['path'];
        }
    }
}