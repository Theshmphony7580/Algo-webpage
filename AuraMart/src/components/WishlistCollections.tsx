import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Heart, Trash2, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { toast } from '@/hooks/use-toast';

interface Collection {
  id: string;
  name: string;
  productIds: number[];
}

export const WishlistCollections = () => {
  const [collections, setCollections] = useState<Collection[]>([
    { id: '1', name: 'My Favorites', productIds: [] }
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const createCollection = () => {
    if (!newCollectionName.trim()) return;
    
    const newCollection: Collection = {
      id: Date.now().toString(),
      name: newCollectionName,
      productIds: []
    };
    
    setCollections([...collections, newCollection]);
    setNewCollectionName('');
    setIsCreating(false);
    toast({ title: 'Collection created', description: `"${newCollectionName}" has been created` });
  };

  const deleteCollection = (id: string) => {
    setCollections(collections.filter(c => c.id !== id));
    toast({ title: 'Collection deleted' });
  };

  const shareCollection = (collection: Collection) => {
    navigator.clipboard.writeText(`Check out my ${collection.name} collection!`);
    toast({ title: 'Link copied', description: 'Collection link copied to clipboard' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">My Collections</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsCreating(true)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          New Collection
        </Button>
      </div>

      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex gap-2"
          >
            <Input
              placeholder="Collection name..."
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && createCollection()}
              autoFocus
            />
            <Button onClick={createCollection}>Create</Button>
            <Button variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-3">
        {collections.map((collection) => (
          <motion.div
            key={collection.id}
            layout
            className="glass-card p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">{collection.name}</p>
                <Badge variant="secondary" className="text-xs">
                  {collection.productIds.length} items
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => shareCollection(collection)}
              >
                <Share2 className="w-4 h-4" />
              </Button>
              {collection.id !== '1' && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteCollection(collection.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
