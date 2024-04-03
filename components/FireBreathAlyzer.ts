import {eventsByCategoryAndDisposition} from "../util/wrappers/getEventsByTypeAndDisposition";
import BuffManager from "../util/managers/BuffManager";

export default getComponent = () => {
  /**
   * Test
   */
  const events = eventsByCategoryAndDisposition(reportGroup.fights[0], "aurasCast", "friendly")
  const bm = new BuffManager(events, {sourceFilters: [{idInReport: 1}]})

  return bm;
}
