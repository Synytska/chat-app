import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loginscreen: {
    flex: 1,
    backgroundColor: "#EEF1FF",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    width: "100%",
  },
  loginheading: {
    fontSize: 26,
    marginBottom: 10,
  },
  logininputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logininput: {
    borderWidth: 1,
    width: "90%",
    padding: 8,
    borderRadius: 2,
  },
  loginbutton: {
    backgroundColor: "green",
    padding: 12,
    marginVertical: 10,
    width: "60%",
    elevation: 1,
  },
  loginbuttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
  chatscreen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chattopContainer: {
    padding: 20,
    backgroundColor: "#1E90FF",
  },
  chatheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chatheading: {
    fontSize: 24,
    color: "#fff",
  },

  chatemptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chatemptyText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalsubheading: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalinput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  modalbuttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalbutton: {
    padding: 10,
    backgroundColor: "#1E90FF",
    borderRadius: 5,
    alignItems: "center",
    width: "48%",
  },
  modaltext: {
    color: "#fff",
  },
  container: {
    flex: 1,
    padding: 10,
  },
  message: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginRight: 10,
  },
});
