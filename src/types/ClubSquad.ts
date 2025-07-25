export interface ClubSquad {
  squad: {
    height: string
    foot: string
    injury: string | null
    suspension: string | null
    captain: boolean
    id: string
    name: string
    image: string
    imageSource: string
    age: number
    positions: {
      first: {
        name: string
        shortName: string
        group: string
      }
      second: {
        name: string
        shortName: string
        group: string
      }
      third: {
        name: string
        shortName: string
        group: string
      }
    }
    nationalities: {
      id: number
      name: string
      image: string
    }[]
    marketValue: {
      value: number
      currency: string
    }
  }[]
}
