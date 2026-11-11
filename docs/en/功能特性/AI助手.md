# AI Assistant

Once a model is configured, the AI doesn't just chat — it can **read and write files and run commands** on your behalf.

## Configuring a model

1. Open **Settings → AI**
2. Enter the **API endpoint**
   - OpenAI: `https://api.openai.com/v1`
   - A gateway such as one-api: whatever your provider gives you
   - Local Ollama: `http://127.0.0.1:11434/v1`
3. Enter the **API key** (with local Ollama, any non-empty value works)
4. Enter the **model name**, e.g. `gpt-4o`, `deepseek-chat`, `qwen2.5:7b`
5. Save

Any OpenAI-compatible endpoint works.

## Starting a conversation

Open the **AI chat** page and describe what you want:

```
Extract every line containing "error" from all .log files in this directory
```

The AI calls tools to carry this out, and each step is shown — you can see which file it read and what command it ran.

## Restricting what the AI can do (important)

The AI can operate the server, so **restrict it on first use**:

1. Open **Settings → AI → Tool permissions**
2. Enable only **read-only** tools first (read file, list directory, query system info)
3. Run a few prompts and confirm the behaviour looks right
4. Then gradually allow file writes and command execution

You can also limit the AI to specific directories so it never touches critical paths.

## Managing multiple sessions

Use separate sessions for separate topics so context doesn't bleed:

- Create, switch and delete sessions from the left-hand list
- Each session keeps its own history
- Rename sessions to tell them apart

## Interrupting a response

You can interrupt at any time:

- Click stop; content already generated **is kept** in the session record
- Interrupting does not lose earlier messages
- Reopening the session lets you continue where you left off

## Long-term memory

Facts worth keeping across sessions, such as:

- "All projects on this machine live under /data/projects"
- "Restart nginx after editing configs"

You don't have to repeat the background every time. Saved memories can be reviewed and cleared in settings.

## Configuring a DingTalk bot

Mention the bot in a DingTalk group to drive the AI.

1. Create an internal app on the DingTalk open platform and enable the bot capability
2. Note the `AppKey` and `AppSecret`
3. Open **Settings → AI → Bots → DingTalk**
4. Enter the AppKey and AppSecret
5. Save, then add the bot to a DingTalk group

After that, mention it in the group to ask questions.

## Configuring a Lark / Feishu bot

1. Create a self-built app on the Lark open platform and enable the bot
2. Note the `App ID` and `App Secret`
3. Enter them under **Settings → AI → Bots → Lark**
4. Configure the event subscription callback URL (pointing at the corresponding FileCat endpoint)
5. Add the bot to a group

## Configuring a QQ bot

QQ bots must be registered on the official QQ open platform. Enter the AppID, Token and Secret under **Settings → AI → Bots → QQ**.

> QQ bots have a strict review process, and individual developers must verify their identity.

## The AI gives poor answers?

- **Model too weak** — switch to a larger model; small models often fumble tool calls
- **Context too long** — start a new session to avoid interference from history
- **Missing permissions** — check whether tool permissions block what it needs
- **Endpoint unreachable** — use the test-connection button in settings to verify the URL and key
