export interface PlayerInfo {
    share: {
        title: string
        description: string
    }
    playerProfile: {
        playerImage: string
        playerFullName: string
        birthplace: string
        dateOfBirth: string
        dateOfDeath: string | null
        playerShirtNumber: string
        age: string
        height: string
        foot: string
        internationalTeam: string
        internationalTeamImage: string
        internationalTeamStatus: string
        internationalGames: string
        internationalGoals: string
        internationalTeamShortTag: string
        internationalShirtNumber: string
        internationalWmMember: boolean
        internationalValueRank: number
        country: string
        countryImage: string
        secondCountry: string
        secondCountryImage: string
        league: string
        leagueLogo: string
        clubImage: string
        club: string
        loan: {
            loan: string
            loanStart: string
            loanUntil: string
            contractOptions: string
            ownerName: string
            ownerID: string
            ownerImage: string
            ownerContractUntil: string
        }
        contractExpiryDate: string
        outfitter: string
        positionGroup: string
        playerMainPosition: string
        playerSecondPosition: string
        playerThirdPosition: string
        marketValue: string
        marketValueCurrency: string
        marketValueNumeral: string
        marketValueLastChange: string
        injury: {
            id: string
            title: string
            until: string
            rehabilitationFlag: string
        }
        absence: {
            id: string
            title: string
            until: string
            competitionID: string
            matches: string
        }
    }
    heroImages: {
        id: string
        url: string
        source: string
    }[]
}
