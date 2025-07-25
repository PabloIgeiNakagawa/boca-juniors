export interface ClubInfo {
    club : {
        id: string
        name: string
        clubnameEN: string
        image: string
        countrynameEN: string
        countryImage: string
        countryID: string
        rank: string
        leagueID: string
        leaguenameEN: string
        leagueName: string
        leagueImage: string
        leagueLevel: string
        coachID: string
        coachName: string
        coachContractUntil: number
        marketValue: string
        marketValueCurrency: string
        marketValueNumeral: string
        marketValueUnformatted: number
        nationalTeamFlag: string
        selectedSeasonID: string
        internationalRank: string
        newCoachID: string
        newCoachStartAt: string
    },
    status: boolean,
    message: string
}
