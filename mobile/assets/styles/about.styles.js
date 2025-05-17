// assets/styles/about.styles.js
import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../constants/colors";
import SPACING from "../../constants/spacing";
import typography from "../../constants/typography";
import metrics from "../../constants/metrics";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    paddingBottom: SPACING.aboutFooterPadding,
  },
  headerTextContainer: {
    paddingTop: SPACING.aboutHeaderPaddingTop,
    paddingBottom: SPACING.aboutHeaderPaddingBottom,
    paddingHorizontal: SPACING.aboutHeaderHorizontal,
    borderBottomLeftRadius: metrics.radius.lg,
    borderBottomRightRadius: metrics.radius.lg,
  },
  headerTitle: {
    fontSize: typography.sizes.xxl,
    fontWeight: "800",
    letterSpacing: typography.letterSpacings.wide,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: typography.sizes.lg,
    fontWeight: "400",
    marginTop: SPACING.aboutHeaderSubtitleMarginTop,
    textAlign: "center",
    opacity: 0.95,
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: SPACING.aboutNavRowMarginTop,
    flexWrap: "wrap",
  },
  navButton: {
    backgroundColor: COLORS.navButtonBg,
    paddingVertical: SPACING.aboutNavButtonVertical,
    paddingHorizontal: SPACING.aboutNavButtonHorizontal,
    borderRadius: metrics.radius.md,
    marginVertical: SPACING.aboutNavButtonMarginVertical,
  },
  navText: {
    color: COLORS.navText,
    fontWeight: "700",
    fontSize: typography.sizes.md,
  },
  illustrationWrapper: {
    alignItems: "center",
    marginTop: SPACING.aboutIllustrationMarginTop,
  },
  illustration: {
    width: width * 0.9,
    height: SPACING.aboutIllustrationHeight,
    borderRadius: metrics.radius.md,
  },
  section: {
    paddingHorizontal: SPACING.aboutSectionHorizontal,
    marginTop: SPACING.aboutSectionMarginTop,
  },
  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: "700",
    marginBottom: SPACING.aboutSectionTitleMarginBottom,
  },
  text: {
    fontSize: typography.sizes.md,
    lineHeight: typography.lineHeights.base,
    marginBottom: SPACING.aboutTextMarginBottom,
  },
  backToTopButton: {
    alignSelf: "center",
    marginTop: SPACING.aboutBackTopMarginTop,
    marginBottom: SPACING.aboutBackTopMarginBottom,
    backgroundColor: COLORS.navButtonBg,
    paddingHorizontal: SPACING.aboutBackTopHorizontal,
    paddingVertical: SPACING.aboutBackTopVertical,
    borderRadius: metrics.radius.md,
  },
  backToTopText: {
    color: COLORS.navText,
    fontSize: typography.sizes.base,
    fontWeight: "600",
  },
});
