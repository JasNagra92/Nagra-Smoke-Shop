import styles from "../Styles/SeasoningsTable.module.css";
import hot from "../Images/hotrub.jpg";
import bbq from "../Images/bbqrub.jpg";
import tx from "../Images/tx.jpg";
import gospel from "../Images/holyGospel.jpg";
import holy from "../Images/holycow.jpg";
import honey from "../Images/honey.jpg";

const SeasoningsTable = () => {
  return (
    <div>
      <div>
        <h2 className={styles.heading}>Seasoning Options</h2>
        <div className={styles.seasoningsContainer}>
          <div className={styles.seasoningTr}>
            <a href="https://therubshack.ca/product/killer-hogs-the-hot-bbq-rub/">
              <img className={styles.seasoning} src={hot} alt="" />
            </a>
            <p className={styles.seasoningDescription}>
              We’re packing heat. This Hot BBQ Rub is a savory, sweet and spicy
              punch of power-packed flavor. And you can’t beat the pretty,
              mahogany color it gives to pork, beef, seafood, or poultry. When
              you want to add a little kick to your BBQ, reach for Killer Hog’s
              Hot BBQ Rub.
            </p>
          </div>
          <div className={styles.seasoningTr}>
            <a href="https://therubshack.ca/product/killer-hogs-the-bbq-rub/">
              <img className={styles.seasoning} src={bbq} alt="" />
            </a>
            <p className={styles.seasoningDescription}>
              Killer Hogs Championship BBQ Team The BBQ Rub. You don’t win BBQ
              Championships without knowing a thing or two about seasoning meat.
              And this rub has it all. flavor. balance. sweetness. and a nice
              little kick at the end. That’s why this rub is THE BBQ RUB period
              .
            </p>
          </div>
          <div className={styles.seasoningTr}>
            <a href="https://bestbbqrubs.ca/collections/bbq-rubs/products/killer-hogs-tx-brisket-rub?variant=31816843034697">
              <img className={styles.seasoning} src={tx} alt="" />
            </a>
            <p className={styles.seasoningDescription}>
              It's a fact the best Brisket comes from Texas. And it's the
              simplicity of salt, pepper, smoke, and fire that makes it so
              delicious. Use TX Brisket Rub for a brisket with authentic Texas
              flavor that will rival the best BBQ joints in the Lone Star state.
              TX Brisket Rub is also great on Ribs, Steaks, or Turkey.
            </p>
          </div>
          <div className={styles.seasoningTr}>
            <a href="https://bestbbqrubs.ca/products/meat-church-honey-hog-bbq-rub?_pos=2&_psq=meat%20church%20honey&_ss=e&_v=1.0&variant=39426683568201">
              <img className={styles.seasoning} src={honey} alt="" />
            </a>
            <p className={styles.seasoningDescription}>
              "This BBQ rub comes from our southern upbringing. This sweet rub
              is excellent on pork ribs, pulled pork, poultry and vegetables.
              You can apply it to anything you like and the color is amazing." -
              Meat Church
            </p>
          </div>
          <div className={styles.seasoningTr}>
            <a href="https://bestbbqrubs.ca/products/meat-church-the-holy-gospel-bbq-rub?_pos=1&_psq=the%20gospel&_ss=e&_v=1.0&variant=39426683732041">
              <img className={styles.seasoning} src={gospel} alt="" />
            </a>
            <p className={styles.seasoningDescription}>
              "The Holy Gospel BBQ Rub, taking the best elements of Holy Cow and
              The Gospel and.... NO, it's not a 50-50 blend. This took tons of
              test cooks to get it right. We saw plenty of folks mashing two
              rubs together plus acted on customer feedback of Holy Cow being
              too much of a black pepper punch or Gospel needing a little more.
              Whatever the case, this blend is great on ribs, chicken and beef!"
              - Meat Church
            </p>
          </div>
          <div className={styles.seasoningTr}>
            <a href="https://bestbbqrubs.ca/products/meat-church-holy-cow-bbq-rub?_pos=2&_psq=holy%20cow&_ss=e&_v=1.0&variant=39426683404361">
              <img className={styles.seasoning} src={holy} alt="" />
            </a>
            <p className={styles.seasoningDescription}>
              This BBQ rub screams Texas! If you have been to Franklin, Kreuz,
              Blacks or Smittys then you know what I am talking about. This
              beefy BBQ seasoning is fantastic on brisket, tri-tip and steaks,
              but can be applied to anything you like. Many folks love it on
              chicken and burgers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SeasoningsTable;
