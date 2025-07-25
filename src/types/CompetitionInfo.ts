export interface CompetitionInfo {
    competition : {
        id: string;
        competitionName: string;
        competitionNameEN: string;
        marketValue: string;
        marketValueCurrency: string;
        marketValueNumeral: string;
        marketValueUnformatted: number;
        competitionImage: string;
        hasTable: boolean;
        trophy: string;
        seasonId: string;
        season: string;
        tournamentFlag: string;
        currentMatchDay: number;
        competitionTypeID: string;
        currentChampionID: string;
        currentChampionName: string;
        currentChampionImage: string;
        internationalFlag: string;
        competitionCountryID: string;
        competitionCountryImage: string;
        competitionCountryName: string;
        competitionCountryNameEN: string;
        leagueLevel: string;
        mostValuablePlayerID: string;
        mostValuablePlayerName: string;
        mostValuablePlayerMarketValue: string;
        mostValuablePlayerMarketValueCurrency: string;
        mostValuablePlayerMarketValueNumeral: string;
        mostValuableClubID: string;
        mostValuableClubName: string;
        mostValuableClubMarketValue: string;
        mostValuableClubMarketValueCurrency: string;
        mostValuableClubMarketValueNumeral: string;
    }

    status: boolean;
    message: string;
}
