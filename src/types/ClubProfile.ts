export interface ClubProfile{
  internationalTeamFlag: string
  mainFacts: {
    id: string
    fullName: string
    street: string
    postalCode: string
    city: string
    phone: string
    fax: string
    homepage: string
    founding: string
    members: string
    membersDate: string
    countryName: string
    countryID: string
    countryImage: string
    avgAge: string
    squadSize: string
    legionaries: string
    internationalRank: string
    nationalPlayer: number
  }
  stadium: {
    id: string
    name: string
    street: string
    postalCode: string
    city: string
    phoneTicketCenter: string
    faxTicketCenter: string
    homepage: string
    ticketCenter: string
    constructionYear: string
    totalCapacity: string
    standingRoom: string
    seats: string
    image: string
  }
  historicImages: string[]
  successes: {
    number: string
    name: string
    id: string
    additionalData: {
      competitionId: string
      competitionTypeId: string
      cycle: string | null
      seasonIds: string[]
    }
  }[]
  additionalTeams: {
    id: string
    name: string
    image: string
  }[]
}