import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import SPACING from "../../constants/spacing";
import typography from "../../constants/typography";
import metrics from "../../constants/metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  listContainer: {
    padding: SPACING.listPadding,
    paddingBottom: SPACING.listPaddingBottom,
  },
  header: {
    marginBottom: SPACING.headerMarginBottom,
    alignItems: "center",
    padding: SPACING.md,
    backgroundColor: COLORS.cardBackground,
    borderRadius: metrics.radius.md,
    borderWidth: metrics.borderWidth.normal,
    borderColor: COLORS.accent,
    ...metrics.shadow.card,
  },
  headerTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.medium,
    letterSpacing: typography.letterSpacings.normal,
    color: "#FF007F",
    marginBottom: 8,
    textTransform: "uppercase",
    textAlign: "center",
  },
  headerIconSpacing: {
    marginLeft: SPACING.sm,
  },
  spacerSmall: {
    height: SPACING.smH,
  },
  headerSubtitle: {
    fontSize: typography.sizes.base,
    fontStyle: "italic",
    color: COLORS.accentLight,
    textAlign: "center",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  barberCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: metrics.radius.md,
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    ...metrics.shadow.card,
    borderWidth: metrics.borderWidth.normal,
    borderColor: COLORS.accent,
  },
  barberHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.barberHeaderMarginBottom,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: SPACING.avatarSize,
    height: SPACING.avatarSize,
    borderRadius: SPACING.avatarSize / 2,
    marginRight: SPACING.sm,
    borderWidth: metrics.borderWidth.thin,
    borderColor: COLORS.primary,
  },
  username: {
    fontSize: typography.sizes.md,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  barberImageContainer: {
    width: "100%",
    height: 200,
    borderRadius: metrics.radius.md,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: COLORS.border,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  barberImage: {
    width: "100%",
    height: "100%",
  },
  barberDetails: {
    padding: SPACING.smallPadding,
  },
  barberTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: SPACING.sm,
  },
  caption: {
    fontSize: typography.sizes.base,
    color: COLORS.textDark,
    marginBottom: 8,
    lineHeight: typography.lineHeights.base,
  },
  date: {
    fontSize: typography.sizes.sm,
    color: COLORS.textSecondary,
    fontStyle: "italic",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.emptyContainerPadding,
    marginTop: SPACING.emptyContainerPadding,
  },
  emptyText: {
    fontSize: typography.sizes.lg,
    fontWeight: "700",
    color: COLORS.textPrimary,
     marginTop: SPACING.sm * 2,
    marginBottom: SPACING.sm,
  },
  emptySubtext: {
    fontSize: typography.sizes.base,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  footerLoader: {
    marginVertical: SPACING.footerVertical,
  },
});

export default styles;
