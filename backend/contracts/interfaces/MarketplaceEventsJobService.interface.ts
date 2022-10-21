export default interface MarketplaceEventsJobServiceInterface {
  fetchEvents(event_type, from, to): Promise<any>
}
