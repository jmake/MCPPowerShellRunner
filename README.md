# PowerShellRunner

When the agent attempts to execute programs located on drives other than `C:`, some issues arise.  
These problems seem to be related to antigravity's own `run_command` tool (in my case). This MCP fixes that.

---
```
npm install @modelcontextprotocol/sdk
```

```
node server.js ## spicy-server running on stdio 
```

```
npx @modelcontextprotocol/inspector node server.js
```


<img width="1613" height="760" alt="image" src="https://github.com/user-attachments/assets/6095b37b-fdb4-484a-8edd-83c7cba4871a" />


<img width="1920" height="929" alt="image" src="https://github.com/user-attachments/assets/e2b38912-519e-469f-ab48-2803f14af3dd" />


---

In the configuration file located at ~/.gemini/config/mcp_config.json.

```
...

    "powershell-runner": {
      "command": "node",
      "args": [
        "-e",
        "const fs = require('fs'), { execSync } = require('child_process'); if (!fs.existsSync('PowerShellRunner')) { execSync('git clone https:\\/\\/github.com\\/jmake\\/PowerShellRunner.git'); execSync('npm install', { cwd: 'PowerShellRunner' }); } import('.\\/PowerShellRunner\\/server.js').catch(console.error);"
      ],
      "env": {}
    }
...
```

--- 

For instance, execute 

- 
```
Start-Process D:\z2025_1\IsaacSim500\isaac-sim.bat
```

-
```
- Start-Process -FilePath "powershell.exe" -ArgumentList "-Command `" & 'path\to\script.py' `"" -RedirectStandardOutput "out.txt" -RedirectStandardError "err.txt"
```

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/84d806a5-f6ff-4100-a9eb-88a5657330c6" />



