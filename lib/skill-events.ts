'use client'

export function announceSkillProfileUpdate() {
  window.dispatchEvent(new Event('skill-profile-updated'))
  if (typeof BroadcastChannel !== 'undefined') {
    const channel = new BroadcastChannel('kwanho-skill-profile')
    channel.postMessage('updated')
    channel.close()
  }
}
