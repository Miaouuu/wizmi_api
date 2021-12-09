export interface CreateLevelInput{
  Body: {
    name: string
    reward: string
    data: string
    worldId: number
    type: string
  }
}

export interface FindLevelInput{
  Params: {
    id: number
  }
}
