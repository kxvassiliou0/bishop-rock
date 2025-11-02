import SettingsIcon from '../../assets/SettingsIcon.svg'
import './home-page.styles.css'

interface HomePageProps {
  onSettingsClick: () => void
}

export default function HomePage({ onSettingsClick }: HomePageProps) {
  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <h1 className="homepage-title">Bishop Rock Lighthouse</h1>
        <button className="homepage-settings-button" onClick={onSettingsClick}>
          <img
            src={SettingsIcon}
            alt="Settings"
            className="homepage-settings-icon"
          />
        </button>
      </div>
      <hr className="homepage-divider" />

      <section className="homepage-section">
        <p>
          Located 24 nautical miles off the southwestern tip of Cornwall,
          England, and just 4 nautical miles from the Isles of Scilly, Bishop
          Rock is famous for being the site of the world's smallest island with
          a building on it. Bishop Rock is considered by many maritime
          historians to be a triumph of Victorian engineering — standing defiant
          against the full force of the Atlantic for over 160 years.
        </p>
      </section>

      <section className="homepage-section">
        <h3 className="homepage-subtitle">A Tower Born from Storms</h3>
        <p>
          The first attempt to construct a lighthouse on this remote rock began
          in 1847 using iron. Unfortunately, before the structure could be lit,
          a ferocious Atlantic storm swept it away. A more resilient granite
          tower, completed in 1858, now stands in its place. In 1887, famed
          lighthouse engineer Sir James Douglass oversaw its strengthening and
          height extension to 49 metres (161 feet), making it one of the tallest
          offshore lighthouses in the world at the time.
        </p>
      </section>

      <section className="homepage-section">
        <h3 className="homepage-subtitle">Life on the Rock</h3>
        <p>
          Manned by a crew of four, only three keepers would be stationed on the
          lighthouse at a time while the fourth was on leave on St Mary’s. Life
          was lonely and dangerous, especially in winter storms. Before the
          helipad was built in 1976, transferring people and supplies was a
          dangerous operation.
        </p>
        <p>
          Ships would approach the base of the rock in often rough seas, and
          keepers on the lighthouse would lower a rope sling and cargo net using
          a hand-operated winch system. Individuals were hoisted one by one,
          dangling in mid-air above jagged rocks and crashing waves. Supplies —
          everything from food and fuel to mail — were hauled up in large netted
          bundles. Timing and coordination were essential, as poor weather could
          delay transfers for weeks.
        </p>
      </section>

      <section className="homepage-section">
        <h3 className="homepage-subtitle">Light Through the Ages</h3>
        <p>
          Bishop Rock's beacon was once powered by candles, later replaced with
          paraffin vapour lamps. Its modern beam, now visible for 24 nautical
          miles, is powered by generators and batteries. In 1976, a helipad was
          added to ease access. The lighthouse was fully automated in 1991. The
          last human keepers departed in December 1992, ending over a century of
          manned operation.
        </p>
      </section>

      <section className="homepage-section">
        <h3 className="homepage-subtitle">Light Characteristic</h3>
        <p>
          The operating signal is <strong>Fl(2) W 15s</strong>, meaning the
          light flashes twice every 15 seconds. This helps ships identify it
          distinctly from other lighthouses along the English coast.
        </p>
      </section>
    </div>
  )
}
