// // The module 'vscode' contains the VS Code extensibility API
// // Import the module and reference it with the alias vscode in your code below
// import * as vscode from 'vscode';

// // This method is called when your extension is activated
// // Your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {

// 	// Use the console to output diagnostic information (console.log) and errors (console.error)
// 	// This line of code will only be executed once when your extension is activated
// 	console.log('Congratulations, your extension "move-last-saved-tab" is now active!');

// 	// The command has been defined in the package.json file
// 	// Now provide the implementation of the command with registerCommand
// 	// The commandId parameter must match the command field in package.json
// 	const disposable = vscode.commands.registerCommand('move-last-saved-tab.helloWorld', () => {
// 		// The code you place here will be executed every time your command is executed
// 		// Display a message box to the user
// 		vscode.window.showInformationMessage('Hello World from Move Last Saved Tab!');
// 	});

// 	context.subscriptions.push(disposable);
// }

// // This method is called when your extension is deactivated
// export function deactivate() {}

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log("Move Last Saved Tab Extension is now active!");
	let disposable = vscode.workspace.onDidSaveTextDocument((document) => {
		console.log(`File saved: ${document.uri.fsPath}`);
		moveTabToFirst(document);
	});

	context.subscriptions.push(disposable);
}

async function moveTabToFirst(document: vscode.TextDocument) {
	const uri = document.uri;
	console.log(`Attempting to move tab for: ${uri.fsPath}`);
	
	// Find the tab associated with the saved document
	const editorGroups = vscode.window.tabGroups.all;
	console.log(`Found ${editorGroups.length} editor groups.`);
	for (const group of editorGroups) {
		const tab = group.tabs.find(tab => 
			tab.input instanceof vscode.TabInputText && tab.input.uri.toString() === uri.toString()
		);

		if (tab) {
			console.log(`Found tab: ${tab.label}`);
			// Close the tab
			await vscode.window.tabGroups.close(tab);
			console.log("Closed the tab.");

			// Reopen the file in the first position
			await vscode.window.showTextDocument(uri, {
				viewColumn: vscode.ViewColumn.One, // Place it in the first column
				preview: false // Ensure it stays open and pinned
			});

			console.log("Reopened the tab in the first position.");
			break;
		}
	}
}

export function deactivate() {
	console.log("Move Last Saved Tab Extension is deactivating.");
}
