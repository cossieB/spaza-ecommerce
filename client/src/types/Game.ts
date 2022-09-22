type T = Record<
'gameId' | 
'title' | 
'cover' | 
'summary' | 
'developerId' |
'publisherId' |
'banner' |
'trailer'
, string>

export type Game = T & {
    releaseDate: Date,
    genres: string[]
    images: string[]
}