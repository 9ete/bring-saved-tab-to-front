import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.workspace.onDidSaveTextDocument((document) => {
		moveTabToFirst(document);
	});

	context.subscriptions.push(disposable);
}

async function moveTabToFirst(document: vscode.TextDocument) {
    const uri = document.uri;
    const editorGroups = vscode.window.tabGroups.all;

    for (const group of editorGroups) {
        const tab = group.tabs.find(tab =>
            tab.input instanceof vscode.TabInputText && tab.input.uri.toString() === uri.toString()
        );

        if (tab) {

            // If the tab is already in the first column, do nothing
            if ( ! group.tabs.indexOf(tab) ) {
                break;
            }

            // If the tab is in preview mode, ensure it is pinned before closing
            if (tab.isPreview) {
                await vscode.window.showTextDocument(uri, { preview: false });
            }

            // Close the tab
            try {
                await vscode.window.tabGroups.close(tab);
            } catch (error) {
                console.log(`Error closing tab: ${(error as any).message}`);
            }

            // Reopen the file in the first column and focus on it
            try {
                const editor = await vscode.window.showTextDocument(uri, {
                    viewColumn: vscode.ViewColumn.One, // Force it into the first column
                    preview: false // Ensure it stays open as a pinned tab
                });

                // Workaround to bring the file to the top of Open Editors list
                vscode.commands.executeCommand("workbench.action.moveEditorToFirstGroup");

            } catch (error) {
                console.log(`Error reopening tab: ${(error as any).message}`);
            }

            break;
        }
    }
}

export function deactivate() {}
