<?php
// Not active on GitHub Pages. For a later Infomaniak host only.
// Point the form at it with VITE_CONTACT_ENDPOINT=/kontakt.php
// or window.ONY_LABS_CONTACT_ENDPOINT = "/kontakt.php" in index.html.
// [PRÜFEN] Absender website@ony-labs.com anlegen und SPF/DKIM prüfen, bevor das live geht.
header('Content-Type: application/json; charset=UTF-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit; }
if (!empty($_POST['website'])) { echo '{"ok":true}'; exit; }
if ((int)($_POST['t'] ?? 0) < 3000) { echo '{"ok":true}'; exit; }
$name  = trim(substr($_POST['name'] ?? '', 0, 200));
$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$pkg   = trim(substr($_POST['package'] ?? '-', 0, 120));
$msg   = trim(substr($_POST['message'] ?? '', 0, 4000));
$co    = trim(substr($_POST['company'] ?? '', 0, 200));
if (!$name || !$email || !$msg || preg_match('/[\r\n]/', $name)) { http_response_code(400); echo '{"ok":false}'; exit; }
$body = "Name: $name\nE-Mail: $email\nFirma: $co\nPaket: $pkg\n\n$msg\n";
$headers = "From: Ony-Labs Website <website@ony-labs.com>\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";
$ok = mail('hello@ony-labs.com', '=?UTF-8?B?'.base64_encode("Anfrage: $pkg").'?=', $body, $headers);
http_response_code($ok ? 200 : 500);
echo json_encode(['ok' => $ok]);
