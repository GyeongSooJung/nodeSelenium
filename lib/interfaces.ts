export interface MusicSummary {
    ranking: number; // 음원 순위
    name: string; // 곡 이름
    singer: string; // 가수 이름
    album: string; // 앨범이름
}

export interface MusicDetail {
    publisher: string; // 발매사
    agency: string; // 기획사
}