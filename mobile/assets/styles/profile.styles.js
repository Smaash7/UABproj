// styles/profile.styles.js
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import metrics from "../../constants/metrics";
import SPACING from "../../constants/spacing";
import typography from "../../constants/typography";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    paddingBottom: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderRadius: metrics.radius.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...metrics.shadow.card,
    borderWidth: metrics.borderWidth.thin,
    borderColor: COLORS.border,
  },
  profileImage: {
    width: SPACING.avatarSize * 2,
    height: SPACING.avatarSize * 2,
    borderRadius: SPACING.avatarSize,
    marginRight: SPACING.md,
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  email: {
    fontSize: typography.sizes.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  memberSince: {
    fontSize: typography.sizes.sm,
    color: COLORS.textSecondary,
  },
  logoutButton: {
    backgroundColor: COLORS.primary,
    borderRadius: metrics.radius.md,
    padding: SPACING.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.lg,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    color: COLORS.white,
    fontFamily: typography.fonts.medium,
    marginLeft: SPACING.xs,
  },
  barbersHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  barbersTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    color: COLORS.textPrimary,
  },
  barbersCount: {
    fontSize: typography.sizes.sm,
    color: COLORS.textSecondary,
  },
  barbersList: {
    paddingBottom: SPACING.md,
  },
  barberItem: {
    flexDirection: "row",
    backgroundColor: COLORS.cardBackground,
    borderRadius: metrics.radius.sm,
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
    ...metrics.shadow.card,
    borderWidth: metrics.borderWidth.thin,
    borderColor: COLORS.border,
  },
  barberImage: {
    width: width * 0.2, // 20% da largura do ecrã
    height: width * 0.3,
    borderRadius: metrics.radius.sm,
    marginRight: SPACING.sm,
  },  
  barberInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  barberTitle: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.medium,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: SPACING.xs,
  },
  barberCaption: {
    fontSize: typography.sizes.sm,
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
    flex: 1,
  },
  barberDate: {
    fontSize: typography.sizes.sm,
    color: COLORS.textSecondary,
  },
  deleteButton: {
    padding: SPACING.sm,
    backgroundColor: COLORS.accentDark,
    borderRadius: metrics.radius.sm,
    alignSelf: "flex-end",
    marginLeft: "auto",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.xxl,
    marginTop: SPACING.md,
  },
  emptyText: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.medium,
    color: COLORS.textPrimary,
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: metrics.radius.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    ...metrics.shadow.card,
  },
  addButtonText: {
    color: COLORS.white,
    fontFamily: typography.fonts.medium,
    fontSize: typography.sizes.sm,
  },
});

export default styles;
