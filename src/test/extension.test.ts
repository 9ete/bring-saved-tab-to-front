import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import * as fs from 'fs';

// Read package.json dynamically
const packageJson = JSON.parse(fs.readFileSync(__dirname + '/../../package.json', 'utf-8'));
const extensionId = `${packageJson.publisher}.${packageJson.name}`;

suite('Move Last Saved Tab Extension Tests', () => {
    let sandbox: sinon.SinonSandbox;

    setup(() => {
        sandbox = sinon.createSandbox();
    });

    teardown(() => {
        sandbox.restore();
    });

    test('Extension should be activated', async () => {
        const extension = vscode.extensions.getExtension(extensionId);
        assert.ok(extension, 'Extension should be defined');

        if (!extension.isActive) {
            await extension.activate();
        }

        assert.ok(extension.isActive, 'Extension should be active after activation');
    });

    test('Should not move the tab if it is already in the first position', async () => {
        const document = await vscode.workspace.openTextDocument({ content: "test content" });
        await vscode.window.showTextDocument(document, { preview: false });

        const executeCommandStub = sandbox.stub(vscode.commands, 'executeCommand').resolves();

        await vscode.workspace.saveAll();

        assert.ok(
            !executeCommandStub.calledWith("workbench.action.moveActiveEditorLeft"),
            "Tab should not move if it's already in the first position."
        );
    });

    test('Should not move untitled files', async () => {
        const untitledDoc = await vscode.workspace.openTextDocument({ content: "unsaved content" });
        await vscode.window.showTextDocument(untitledDoc);

        const executeCommandStub = sandbox.stub(vscode.commands, 'executeCommand').resolves();

        await vscode.workspace.saveAll();

        assert.ok(
            !executeCommandStub.called,
            "Untitled documents should not trigger tab move."
        );
    });

    test('Should handle errors gracefully', async () => {
        const document = await vscode.workspace.openTextDocument({ content: "test content" });
        await vscode.window.showTextDocument(document);

        const commandStub = sandbox.stub(vscode.commands, 'executeCommand').throws(new Error("Simulated Error"));

        try {
            await vscode.workspace.saveAll();
        } catch (error) {
            assert.fail("The extension should handle errors without crashing.");
        }

        commandStub.restore();
    });
});