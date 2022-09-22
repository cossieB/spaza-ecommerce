export type Platform = Record< 
'platformId' |
'logo' |
'name' |
'summary'
, string> & {
    release: Date
}
