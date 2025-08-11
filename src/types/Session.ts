export interface StateProps {
  backgroundImageUrl: string
  takeCount: number
  cutCount: number
  timeLimit: number
  cuts?: {
    cutUrl: string
  }[]
}
