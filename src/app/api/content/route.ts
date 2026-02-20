import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import PageContent from '@/models/PageContent';

const DEFAULT_CONTENT = {
  title: "Sledovací Systém v Reálnom Čase",
  subtitle: "Moderné riešenie pre vzdialené monitorovanie pomocou Raspberry Pi 5. Zabezpečený prístup k živému prenosu.",
  creators: ["Alex Krehlík", "Tomáš Jakubkovič"],
  techShowcase: ["Raspberry Pi 5", "WiFi 802.11", "WebSocket", "HTML5 Canvas", "MJPEG Stream"],
  features: [
    "Domácnostiam pre zabezpečenie",
    "Malým firmám pre dozor",
    "DIY nadšencom",
    "Školám a univerzitám",
    "Garážam a dielňam",
    "Letným chatám"
  ],
  benefits: [
    "Jednoduchá inštalácia bez potreby špeciálnych nástrojov",
    "Prístup z akéhokoľvek zariadenia s prehliadačom",
    "Open-source kód voľne prispôsobiteľný",
    "Žiadne mesačné poplatky ani predplatné",
    "Lokálne ukladanie bez závislosti na cloude"
  ],
  securityText: "Všetky dáta sú prenášané cez šifrované spojenie využívajúce protokol HTTPS/WSS. Systém podporuje autentifikáciu používateľov a každý prístup je zaznamenávaný do logu."
};

export async function GET() {
  try {
    await dbConnect();
    
    let content = await PageContent.findOne();
    
    if (!content) {
      content = await PageContent.create(DEFAULT_CONTENT);
    }
    
    return NextResponse.json(content);
  } catch (error) {
    console.error('Database error, falling back to static content:', error);
    // Return default content as fallback so the page doesn't crash
    return NextResponse.json(DEFAULT_CONTENT);
  }
}
