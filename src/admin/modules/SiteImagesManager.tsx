import React, { useState } from 'react';
import { CMSData } from '../../types';
import { ChevronDown, Plus, Trash2, Edit2, Image as ImageIcon, Film } from 'lucide-react';

interface SiteImagesManagerProps {
  data: CMSData;
  setData: (data: CMSData) => void;
}

type AssetTab = 'background' | 'illustrative' | 'videos';

export const SiteImagesManager: React.FC<SiteImagesManagerProps> = ({ data, setData }) => {
  const [activeTab, setActiveTab] = useState<AssetTab>('background');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<any>(null);

  const handleDeleteImage = (id: string, type: AssetTab) => {
    const newData = { ...data };
    if (type === 'background') {
      newData.siteAssets.backgroundImages = newData.siteAssets.backgroundImages.filter(img => img.id !== id);
    } else if (type === 'illustrative') {
      newData.siteAssets.illustrativeImages = newData.siteAssets.illustrativeImages.filter(img => img.id !== id);
    } else if (type === 'videos') {
      newData.siteAssets.videos = newData.siteAssets.videos.filter(video => video.id !== id);
    }
    setData(newData);
  };

  const handleEditImage = (item: any, type: AssetTab) => {
    setEditingId(item.id);
    setEditFormData({ ...item });
  };

  const handleSaveEdit = (type: AssetTab) => {
    const newData = { ...data };
    if (type === 'background') {
      const index = newData.siteAssets.backgroundImages.findIndex(img => img.id === editingId);
      if (index !== -1) {
        newData.siteAssets.backgroundImages[index] = editFormData;
      }
    } else if (type === 'illustrative') {
      const index = newData.siteAssets.illustrativeImages.findIndex(img => img.id === editingId);
      if (index !== -1) {
        newData.siteAssets.illustrativeImages[index] = editFormData;
      }
    } else if (type === 'videos') {
      const index = newData.siteAssets.videos.findIndex(video => video.id === editingId);
      if (index !== -1) {
        newData.siteAssets.videos[index] = editFormData;
      }
    }
    setData(newData);
    setEditingId(null);
    setEditFormData(null);
  };

  const handleAddNew = (type: AssetTab) => {
    const newData = { ...data };
    const newId = Date.now().toString();
    
    if (type === 'background') {
      newData.siteAssets.backgroundImages.push({
        id: newId,
        name: 'Nouvelle Image Arrière-plan',
        section: 'hero',
        url: '',
        width: 2560,
        height: 1440,
        size: '0 MB',
        uploadedAt: new Date().toISOString().split('T')[0],
        alt: ''
      });
    } else if (type === 'illustrative') {
      newData.siteAssets.illustrativeImages.push({
        id: newId,
        name: 'Nouvelle Image Illustrative',
        section: 'about',
        url: '',
        width: 1200,
        height: 800,
        size: '0 MB',
        uploadedAt: new Date().toISOString().split('T')[0],
        alt: '',
        caption: ''
      });
    } else if (type === 'videos') {
      newData.siteAssets.videos.push({
        id: newId,
        name: 'Nouvelle Vidéo',
        section: 'hero',
        url: '',
        thumbnail: '',
        width: 1920,
        height: 1080,
        duration: '0:00',
        size: '0 MB',
        uploadedAt: new Date().toISOString().split('T')[0],
        alt: ''
      });
    }
    setData(newData);
  };

  const renderImageCard = (item: any, type: AssetTab) => {
    const isEditing = editingId === item.id;

    if (isEditing) {
      return (
        <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Nom"
              value={editFormData.name}
              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Section"
              value={editFormData.section}
              onChange={(e) => setEditFormData({ ...editFormData, section: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="URL"
              value={editFormData.url}
              onChange={(e) => setEditFormData({ ...editFormData, url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Largeur"
                value={editFormData.width}
                onChange={(e) => setEditFormData({ ...editFormData, width: parseInt(e.target.value) })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                placeholder="Hauteur"
                value={editFormData.height}
                onChange={(e) => setEditFormData({ ...editFormData, height: parseInt(e.target.value) })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <input
              type="text"
              placeholder="Taille du fichier"
              value={editFormData.size}
              onChange={(e) => setEditFormData({ ...editFormData, size: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Texte alternatif"
              value={editFormData.alt}
              onChange={(e) => setEditFormData({ ...editFormData, alt: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            {type === 'illustrative' && (
              <input
                type="text"
                placeholder="Légende"
                value={editFormData.caption || ''}
                onChange={(e) => setEditFormData({ ...editFormData, caption: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            )}
            {type === 'videos' && (
              <>
                <input
                  type="text"
                  placeholder="URL de la miniature"
                  value={editFormData.thumbnail || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, thumbnail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Durée (MM:SS)"
                  value={editFormData.duration || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, duration: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </>
            )}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => handleSaveEdit(type)}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Enregistrer
              </button>
              <button
                onClick={() => {
                  setEditingId(null);
                  setEditFormData(null);
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
        <div className="h-48 bg-gray-100 overflow-hidden relative">
          {item.url ? (
            <img
              src={item.url}
              alt={item.alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23f3f4f6%22 width=%22200%22 height=%22200%22/%3E%3C/svg%3E';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                {type === 'videos' ? (
                  <Film className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                ) : (
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                )}
                <p className="text-gray-500 text-sm">Pas d'image</p>
              </div>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <strong>Section:</strong> {item.section}
            </p>
            <p>
              <strong>Dimensions:</strong> {item.width}x{item.height}px
            </p>
            <p>
              <strong>Taille:</strong> {item.size}
            </p>
            {item.caption && (
              <p>
                <strong>Légende:</strong> {item.caption}
              </p>
            )}
            {item.duration && (
              <p>
                <strong>Durée:</strong> {item.duration}
              </p>
            )}
            <p>
              <strong>Alt:</strong> {item.alt}
            </p>
          </div>
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => handleEditImage(item, type)}
              className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-700 py-2 rounded hover:bg-blue-100"
            >
              <Edit2 className="w-4 h-4" />
              Éditer
            </button>
            <button
              onClick={() => handleDeleteImage(item.id, type)}
              className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-700 py-2 rounded hover:bg-red-100"
            >
              <Trash2 className="w-4 h-4" />
              Supprimer
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    let items: any[] = [];
    let tabName = '';

    if (activeTab === 'background') {
      items = data.siteAssets.backgroundImages;
      tabName = 'Images Arrière-plan';
    } else if (activeTab === 'illustrative') {
      items = data.siteAssets.illustrativeImages;
      tabName = 'Images Illustratives';
    } else {
      items = data.siteAssets.videos;
      tabName = 'Vidéos';
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{tabName}</h2>
          <button
            onClick={() => handleAddNew(activeTab)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <Plus className="w-5 h-5" />
            Ajouter
          </button>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500">Aucun élément pour cette catégorie</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => renderImageCard(item, activeTab))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Gestion des Images du Site</h1>

      {/* Tabs Navigation */}
      <div className="flex gap-2 mb-8 border-b border-gray-200">
        {(
          [
            { id: 'background', label: 'Images Arrière-plan', icon: ImageIcon },
            { id: 'illustrative', label: 'Images Illustratives', icon: ImageIcon },
            { id: 'videos', label: 'Vidéos', icon: Film }
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SiteImagesManager;
