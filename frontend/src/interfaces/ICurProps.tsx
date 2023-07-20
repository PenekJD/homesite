export default interface ICardProps {
  val: string,
  dec: string,
  func: (() => void) | (() => {})
}