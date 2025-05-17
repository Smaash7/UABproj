// assets/styles/create.styles.js
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import SPACING from "../../constants/spacing";
import typography from "../../constants/typography";
import metrics from "../../constants/metrics";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.createContainerPadding,          
  },
  scrollViewStyle: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: metrics.radius.md,                  
    padding: SPACING.createCardPadding,               
    marginVertical: SPACING.createCardMarginVertical, 
    ...metrics.shadow.card,
    borderWidth: metrics.borderWidth.thin,            
    borderColor: COLORS.border,
  },
  header: {
    alignItems: "center",
    marginBottom: SPACING.createHeaderMarginBottom,   
  },
  title: {
    fontSize: typography.sizes.lg,                    
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: SPACING.createTitleMarginBottom,   
  },
  subtitle: {
    fontSize: typography.sizes.base,                  
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  form: {
    marginBottom: SPACING.createFormMarginBottom,    
  },
  formGroup: {
    marginBottom: SPACING.createFormGroupMarginBottom, 
  },
  label: {
    fontSize: typography.sizes.base,                  
    marginBottom: SPACING.createLabelMarginBottom,   
    color: COLORS.textPrimary,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    borderRadius: metrics.radius.sm,                  
    borderWidth: metrics.borderWidth.thin,            
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.createInputPaddingHorizontal, 
  },
  inputIcon: {
    marginRight: SPACING.createInputIconMarginRight, 
  },
  input: {
    flex: 1,
    height: SPACING.createInputHeight,                
    color: COLORS.textDark,
    fontSize: typography.sizes.base,
  },
  textArea: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: metrics.radius.sm,                  
    borderWidth: metrics.borderWidth.thin,            
    borderColor: COLORS.border,
    padding: SPACING.createTextAreaPadding,           
    height: SPACING.createTextAreaHeight,             
    color: COLORS.textDark,
    fontSize: typography.sizes.base,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    borderRadius: metrics.radius.sm,
    borderWidth: metrics.borderWidth.thin,
    borderColor: COLORS.border,
    padding: SPACING.createRatingPadding,             
  },
  starButton: {
    padding: SPACING.createStarButtonPadding,       
  },
  imagePicker: {
    width: "100%",
    height: SPACING.createImagePickerHeight,          
    backgroundColor: COLORS.inputBackground,
    borderRadius: metrics.radius.sm,
    borderWidth: metrics.borderWidth.thin,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  placeholderContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: COLORS.textSecondary,
    marginTop: SPACING.createPlaceholderTextMarginTop,
    fontSize: typography.sizes.base,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: metrics.radius.sm,
    height: SPACING.createButtonHeight,               
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.createButtonMarginTop,         
    ...metrics.shadow.card,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: typography.sizes.base,
    fontWeight: "600",
  },
  buttonIcon: {
    marginRight: SPACING.createButtonIconMarginRight, 
  },
});
