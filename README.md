## KNOWN ISSUES

The current implementation of the contract test using the script files of the webpage fail to run due to node not being able to handle the "export default" in the zcript files. Unable to fix this quickly the files have been copied and the export updated to "module.exports". This allows for the copied script to used in the contract test and the original files in the browser.
