import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";
import { AppConstants } from "./app/app.constants";

const { width } = Dimensions.get("window");
const isSmallScreen = width <= 375;

export const gStyles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: AppConstants.black,
  },
  container: {
    flex: 1,
    backgroundColor: AppConstants.black,
  },
  mainContainer: {
    height: "100%",
    backgroundColor: AppConstants.black,
  },
  mainText: {
    flex: 1,
    color: AppConstants.peach,
    fontFamily: "Arimo",
    fontSize: 36,
    padding: 20,
  },
  mainSection: {
    flex: 1,
    backgroundColor: AppConstants.primary,
    margin: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionPrimaryText: {
    color: AppConstants.peach,
    fontFamily: "Arimo",
    padding: 5,
    fontSize: 20,
  },
  sectionSecondaryText: {
    color: AppConstants.white,
    padding: 5,
    textAlign: "center",
    fontFamily: "Arimo",
  },
  sections: {
    flex: 12,
  },
  bottomButtons: {
    backgroundColor: AppConstants.primary_dark,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    marginHorizontal: 10,
  },
  newsSection: {
    backgroundColor: AppConstants.primary,
    padding: 10,
    margin: 10,
    borderRadius: 30,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  newsImage: {
    height: 150,
    flex: 1,
  },
  newsInfo: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: AppConstants.primary_dark,
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
  },
  newsText: {
    fontFamily: "Arimo",
    fontSize: isSmallScreen ? 16 : 18,
    color: AppConstants.peach,
  },
  newsSource: {
    fontFamily: "Arimo",
    fontSize: isSmallScreen ? 16 : 18,
    color: AppConstants.mint,
    alignSelf: "flex-end",
  },
  sortButton: {
    padding: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "black",
  },
  sortButtonText: {
    fontFamily: "Arimo",
    fontSize: 18,
    letterSpacing: 0.25,
    color: AppConstants.white,
    textTransform: "uppercase",
  },
  fiatsCard: {
    backgroundColor: AppConstants.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    margin: 10,
    borderRadius: 30,
  },
  fiatsIcon: {
    height: 30,
    width: 30,
  },
  fiatsInfoWrapper: {
    backgroundColor: AppConstants.primary_dark,
    borderRadius: 30,
  },
  fiatsInfo: {
    padding: 5,
    fontSize: 18,
    fontFamily: "Arimo",
  },
  cryptoContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  coinsCard: {
    width: "40%",
    backgroundColor: AppConstants.primary,
    padding: 10,
    margin: 10,
    borderRadius: 30,
  },
  coinsSection: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  coinsIcon: {
    height: isSmallScreen ? 30 : 40,
    width: isSmallScreen ? 30 : 40,
  },
  coinsText: {
    color: AppConstants.peach,
    padding: isSmallScreen ? 5 : 10,
    fontSize: isSmallScreen ? 16 : 20,
    fontFamily: "Arimo",
  },
  coinsPriceChange: {
    color: AppConstants.peach,
    padding: isSmallScreen ? 5 : 10,
    fontSize: isSmallScreen ? 16 : 20,
    fontFamily: "Arimo",
  },
  coinsPrice: {
    padding: isSmallScreen ? 5 : 10,
    fontSize: isSmallScreen ? 16 : 20,
    color: AppConstants.white,
    fontFamily: "Arimo",
  },
  coinsPriceUp: {
    color: AppConstants.mint,
  },
  coinsPriceDown: {
    color: AppConstants.red,
  },
  marketSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: isSmallScreen ? 5 : 10,
    margin: 10,
    borderRadius: 30,
    backgroundColor: AppConstants.primary,
  },
  marketInfo: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  marketValue: {
    flex: 2,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: AppConstants.primary_dark,
  },
  marketText: {
    fontSize: isSmallScreen ? 16 : 18,
    fontFamily: "Arimo",
    color: AppConstants.peach,
  },
  converterContainer: {
    flex: 1,
    padding: 10,
    margin: 10,
  },
  converterWrapper: {
    flex: 8,
    justifyContent: isSmallScreen ? "flex-start" : "space-around",
  },
  converterBlock: {
    backgroundColor: AppConstants.primary_dark,
    padding: 10,
    margin: 10,
    borderColor: AppConstants.peach,
    borderWidth: 2,
    justifyContent: "space-between",
  },
  converterText: {
    marginVertical: 5,
    color: AppConstants.peach,
    fontSize: 18,
    fontFamily: "Arimo",
  },
  resultText: {
    color: AppConstants.mint,
    fontSize: 20,
    padding: 5,
    fontFamily: "Arimo",
  },
  resultBlock: {
    flex: 1,
    justifyContent: "center",
  },
  resultSection: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  pickerContainer: {
    backgroundColor: AppConstants.primary_dark,
    padding: 10,
    margin: 10,
    borderRadius: 30,
  },
  pickerLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  pickerText: {
    fontSize: isSmallScreen ? 16 : 18,
    fontFamily: "Arimo",
    color: AppConstants.peach,
  },
  pickerValue: {
    fontSize: isSmallScreen ? 16 : 20,
    fontFamily: "Arimo",
    color: AppConstants.mint,
  },
  pickerInput: {
    color: AppConstants.white,
    alignSelf: "center",
  },
});
